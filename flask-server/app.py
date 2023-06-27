from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = 'database.db'
SCHEMA = 'schema.sql'

def get_db():
    db = sqlite3.connect(DATABASE)
    return db

#close db connection after requests
def teardown_request(exception):
    db = get_db()
    db.close()

# Create tables and load data
def create_tables():
    db = get_db()
    with open(SCHEMA, 'r') as f:
        db.cursor().executescript(f.read())
    db.commit()

# Create tables and load data when the app is started
def initialize_database():
    create_tables()
    print("Database tables created and data loaded")

# Register teardown_request function
app.teardown_request(teardown_request)


# Get a list of all pizzas
@app.route('/pizzas', methods=['GET'])
def get_all_pizzas():
    db = get_db()
    cursor = db.execute('SELECT * FROM PizzaView')
    pizzas = cursor.fetchall()
    result = []
    for pizza in pizzas:
        pizza_data = {
            'id': pizza[0],  # Use integer index
            'name': pizza[1],
            'price': pizza[2],
            'image': pizza[3],
            'ingredients': pizza[4].split(',')
        }
        result.append(pizza_data)
    return jsonify(result)
    

@app.route('/pizza/<int:pizza_id>')
def get_pizza(pizza_id):
    db = get_db()
    cursor = db.cursor()

    # Fetch pizza details from PizzaView
    cursor.execute("SELECT * FROM PizzaView WHERE pizza_id = ?", (pizza_id,))
    pizza_data = cursor.fetchone()

    if pizza_data is None:
        return None

    # Extract pizza details from the fetched data
    pizza = {
        'id': pizza_data[0],
        'name': pizza_data[1],
        'price': pizza_data[2],
        'image': pizza_data[3],
        'ingredients': pizza_data[4].split(',')
    }

    return jsonify(pizza)

@app.route('/get_extra_ingredients', methods=['GET'])
def get_extra_ingredients():
    db = get_db()
    cursor = db.cursor()

    # Retrieve all records from the Extra table
    cursor.execute("SELECT * FROM Extra")
    extras = cursor.fetchall()

    # Prepare a list of dictionaries for JSON serialization
    extra_ingredients = []
    for extra in extras:
        extra_data = {
            'extra_id': extra[0],
            'name': extra[1],
            'price': extra[2]
        }
        extra_ingredients.append(extra_data)

    return jsonify(extra_ingredients)

@app.route('/create_order', methods=['POST'])
def create_order():
    data = request.json
    pizza_id = int(data.get('pizza_id'))
    customer_name = data.get('customer_name')
    address = data.get('address')
    extra_ids = data.get('extra_ids')

    db = get_db()
    cursor = db.cursor()

    # Insert order into the Orders table
    cursor.execute("INSERT INTO Orders (pizza_id, customer_name, address, extra_ingredient_ids) VALUES (?, ?, ?, ?)",
                   (pizza_id, customer_name, address, extra_ids))
    order_id = cursor.lastrowid

    db.commit()

    return jsonify({'message': 'Order placed successfully', 'order_id': order_id})


@app.route('/get_orders', methods=['GET'])
def get_orders():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM Orders")
    orders = cursor.fetchall()

    order_list = []
    for order in orders:
        order_id, pizza_id, customer_name, address, extra_ingredients_str = order

        # Retrieve pizza details
        cursor.execute("SELECT name FROM Pizza WHERE pizza_id=?", (pizza_id,))
        pizza_name = cursor.fetchone()[0]

        # Split the extra ingredient IDs if the string is not empty
        extra_ingredients = []
        if extra_ingredients_str:
            extra_ids = [int(extra_id) for extra_id in extra_ingredients_str.split(",")]

            # Fetch the names of valid extra ingredient IDs
            cursor.execute("SELECT name FROM Extra WHERE extra_id IN ({})".format(",".join(["?"] * len(extra_ids))), extra_ids)
            extra_ingredients = [row[0] for row in cursor.fetchall()]
            extra_ingredients = ", ".join(extra_ingredients)

        # Assign default value if no extra ingredients
        if not extra_ingredients:
            extra_ingredients = ["No extra ingredients"]

        order_data = {
            'order_id': order_id,
            'pizza_id': pizza_id,
            'pizza_name': pizza_name,
            'customer_name': customer_name,
            'address': address,
            'extra_ingredients': extra_ingredients
        }
        order_list.append(order_data)

    return jsonify(order_list)


# Function to initialize the app and database
def initialize_app():
    with app.app_context():
        initialize_database()

if __name__ == '__main__':
    initialize_app()
    app.run()