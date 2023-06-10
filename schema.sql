--the pizza (one pizza to many orders)
CREATE TABLE Pizza (
  pizza_id INT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  image VARCHAR(255)
);

--ingredients for pizza (one ingredients to many pizzaingredients)
CREATE TABLE Ingredient (
  ingredient_id INT PRIMARY KEY,
  name VARCHAR(255)
);

--extra added ingredients (one extra to many orders)
CREATE TABLE Extra (
  extra_id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);

--JUNTION TABLE
CREATE TABLE PizzaIngredients (
  FOREIGN KEY (pizza_id) REFERENCES Pizza(pizza_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);

CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  FOREIGN KEY (pizza_id) REFERENCES Pizza(pizza_id) --pizza table pk to fk
  customer_name VARCHAR(255),
  address VARCHAR(255), 
  extra_ingredient_ids VARCHAR(255) --comma seperated ids of extra table values
);


-- Insert Pizza data
INSERT INTO Pizza (id, name, price, image)
VALUES
  (1, 'Cheese & Tomato', 11.90, 'cheesetomato.jpg'),
  (2, 'Mighty Meaty', 16.90, 'mighty-meaty-pizza.jpg'),
  (3, 'Pepperoni Passion', 16.90, 'pepperoni-passion-pizza.jpg'),
  (4, 'Texas BBQ', 16.90, 'texas-bbq-pizza.jpg'),
  (5, 'Vegi Supreme', 16.90, 'vegisupreme-pizza.jpg'),
  (6, 'American Hot', 15.90, 'ahot_thumbnail.jpg'),
  (7, 'Chicken and Rasher Bacon', 16.90, 'CHICKEN_RASHER_BACON.jpg'),
  (8, 'Chicken Feast', 15.90, 'chickenfeast.jpg'),
  (9, 'Four Vegi', 15.90, 'FourVegi.jpg'),
  (10, 'Hot & Spicy', 15.90, 'hot-n-spicy-pizza.jpg'),
  (11, 'Meateor', 16.90, 'meateor.jpg'),
  (12, 'New Yorker', 16.90, 'new-yorker.jpg'),
  (13, 'Tandoori Hot', 16.90, 'tandoori-hot-pizza.jpg'),
  (14, 'The Sizzler', 16.90, 'TheSizzler80x56.jpg');

--insert ingredents data
INSERT INTO Ingredient (ingredient_id, name)
VALUES
  (1, 'tomato'),
  (2, 'cheese'),
  (3, 'pepperoni'),
  (4, 'ham'),
  (5, 'onion'),
  (6, 'mushrooms'),
  (7, 'sausage'),
  (8, 'bbq sauce'),
  (9, 'bacon'),
  (10, 'roast chicken'),
  (11, 'green peppers'),
  (12, 'spinach'),
  (13, 'jalapeno'),
  (14, 'beef'),
  (15, 'pork meatballs'),
  (16, 'garlic sauce');

--insert extras data
INSERT INTO Extra (extra_id, name, price)
VALUES
  (1, 'ham', 2),
  (2, 'onion', 1),
  (3, 'bacon', 2),
  (4, 'cheese', 1.4),
  (5, 'green peppers', 1.2),
  (6, 'mushrooms', 1.2);

--inset pizza mappings
INSERT INTO PizzaIngredients (pizza_id, ingredient_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 1),
  (3, 3),
  (3, 2),
  (4, 7),
  (4, 8),
  (4, 9),
  (4, 10),
  (5, 1),
  (5, 10),
  (5, 11),
  (5, 12),
  (6, 1),
  (6, 11),
  (6, 13),
  (6, 14),
  (7, 1),
  (7, 8),
  (7, 9),
  (7, 15),
  (8, 1),
  (8, 9),
  (8, 10),
  (9, 1),
  (9, 10),
  (9, 11),
  (9, 12),
  (10, 1),
  (10, 8),
  (10, 10),
  (10, 11),
  (10, 13),
  (11, 7),
  (11, 8),
  (11, 9),
  (11, 10),
  (11, 13),
  (11, 15),
  (12, 1),
  (12, 3),
  (12, 8),
  (12, 12),
  (13, 1),
  (13, 9),
  (13, 10),
  (13, 11),
  (13, 14),
  (14, 1),
  (14, 8),
  (14, 10),
  (14, 11),
  (14, 13),
  (14, 15);
