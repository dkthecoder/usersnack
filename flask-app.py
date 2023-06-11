from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = 'database.db'
SCHEMA = 'schema.sql'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect('database.db')
    return db

# Open database connection before request
@app.before_request
def before_request():
    g.db = get_db()

#close db connection after requests
@app.teardown_request
def teardown_request(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Create tables and load data
def create_tables():
    db = get_db()
    with app.open_resource(SCHEMA, mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

# Create tables and load data when the app is started
@app.before_first_request
def initialize_database():
    create_tables()
    print("Database tables created and data loaded")


# Get a list of all pizzas
@app.route('/api/pizzas', methods=['GET'])
def get_all_pizzas():
    db = get_db()
    cursor = db.execute('SELECT p.pizza_id, p.name, p.price, p.image, GROUP_CONCAT(i.name) as ingredients '
                       'FROM Pizza p '
                       'JOIN PizzaIngredients pi ON p.pizza_id = pi.pizza_id '
                       'JOIN Ingredient i ON pi.ingredient_id = i.ingredient_id '
                       'GROUP BY p.pizza_id')
    pizzas = cursor.fetchall()
    result = []
    for pizza in pizzas:
        pizza_data = {
            'id': pizza['pizza_id'],
            'name': pizza['name'],
            'price': pizza['price'],
            'image': pizza['image'],
            'ingredients': pizza['ingredients'].split(',')
        }
        result.append(pizza_data)
    return jsonify(result)
    
from flask import jsonify

@app.route('/pizza/<int:pizza_id>')
def get_pizza(pizza_id):
    db = get_db()
    cursor = db.cursor()

    # Fetch pizza details
    cursor.execute("SELECT * FROM Pizza WHERE id = ?", (pizza_id,))
    pizza_data = cursor.fetchone()

    if pizza_data is None:
        return None

    # Fetch associated ingredients
    cursor.execute("""
        SELECT i.name
        FROM PizzaIngredients pi
        JOIN Ingredient i ON pi.ingredient_id = i.ingredient_id
        WHERE pi.pizza_id = ?
        """, (pizza_id,))
    ingredients = [row[0] for row in cursor.fetchall()]

    # Fetch extra ingredients
    cursor.execute("""
        SELECT name
        FROM Extra
        WHERE pizza_id = ?
        """, (pizza_id,))
    extras = [row[0] for row in cursor.fetchall()]

    # Prepare pizza data
    pizza = {
        'id': pizza_data[0],
        'name': pizza_data[1],
        'price': pizza_data[2],
        'image': pizza_data[3],
        'ingredients': ingredients,
        'extras': extras
    }

    return pizza


@app.route('/create_order', methods=['POST'])
def create_order():
    pizza_id = int(request.form.get('pizza_id'))
    customer_name = request.form.get('customer_name')
    address = request.form.get('address')
    extra_ids = request.form.get('extra_ids')

    db = get_db()
    cursor = db.cursor()

    # Insert order into the Orders table
    cursor.execute("INSERT INTO Orders (pizza_id, customer_name, address) VALUES (?, ?, ?)",
                   (pizza_id, customer_name, address))
    order_id = cursor.lastrowid

    # Insert extra ingredients into the OrderExtras table
    if extra_ids:
        extra_ids = extra_ids.split(',')
        for extra_id in extra_ids:
            cursor.execute("INSERT INTO OrderExtras (order_id, extra_id) VALUES (?, ?)",
                           (order_id, extra_id))

    db.commit()

    return jsonify({'message': 'Order placed successfully', 'order_id': order_id})


def get_order():
    return "<p>Hello, World!</p>"



