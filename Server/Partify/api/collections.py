"""REST API for collections."""
import Partify.model
from flask import jsonify, make_response, request
import Partify


@Partify.app.route('/<int:year>/<make>/<model>/', methods=['GET'])
def get_collections(year, make, model):
    """Get the collections from the given year, make, and model."""
    # Connect to the database
    connection = Partify.model.get_db()

    # Query the database
    cur = connection.execute(
        "SELECT id, type "
        "FROM Products "
        "WHERE year = ? "
        "AND make = ? "
        "AND model = ? "
        "GROUP BY type ",
        (year, make, model)
    )

    # Pull the results of the query
    context = {'results' : cur.fetchall()}

    return make_response(jsonify(**context), 200)


@Partify.app.route('/years/', methods=['GET'])
def get_years():
    """Return all distinct years in the database."""
    # Connect to the database
    connection = Partify.model.get_db()

    # Query the database
    cur = connection.execute(
        "SELECT DISTINCT year "
        "FROM products",
        tuple()
    )

    temp = cur.fetchall()
    result = []

    # Convert the list of Dicts to a list of ints
    for t in temp:
        result.append(t['year'])

    context = {'years' : result}

    return make_response(jsonify(**context), 200)


@Partify.app.route('/makes/', methods=['GET'])
def get_makes():
    """Return all distinct makes based on URL parameters."""
    # Connect to the database
    connection = Partify.model.get_db()

    year = request.args.get('year', type=int)

    context = {}

    if year is not None:
        # Query the database
        cur = connection.execute(
            "SELECT DISTINCT make "
            "FROM Products "
            "WHERE year = ?",
            (year, )
        )
        context['year'] = year
    else:
        # Query the database
        cur = connection.execute(
            "SELECT DISTINCT make "
            "FROM Products",
            tuple()
        )

    temp = cur.fetchall()
    result = []

    # Convert the list of Dicts
    for t in temp:
        result.append(t['make'])

    context['makes'] = result

    return make_response(jsonify(**context), 200)


@Partify.app.route('/models/', methods=['GET'])
def get_models():
    """Return all distinct models based on URL parameters."""
    # Connect to the database
    connection = Partify.model.get_db()

    year = request.args.get('year', type=int)
    make = request.args.get('make')

    context = {}

    if year is not None and make is not None:
        # Query the database
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products "
            "WHERE year = ? "
            "AND make = ?",
            (year, make)
        )
        context['year'] = year
        context['make'] = make
    elif year is not None:
        # Query the database
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products "
            "WHERE year = ?",
            (year, )
        )
        context['year'] = year
    elif make is not None:
        # Query the database
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products "
            "WHERE make = ?",
            (make, )
        )
        context['make'] = make
    else:
        # Query the database
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products",
            tuple()
        )

    temp = cur.fetchall()
    result = []

    # Convert the list of Dicts
    for t in temp:
        result.append(t['model'])

    context['models'] = result

    return make_response(jsonify(**context), 200)


@Partify.app.route('/products/', methods=['GET'])
def get_products():
    """Get the requested products from the database."""
    year = request.args.get('year', type=int)
    make = request.args.get('make')
    model = request.args.get('model')

    if year is None or make is None or model is None:
        context = {
            'products': [],
            'error': 'Please specify year, make, and model'
        }
        return make_response(jsonify(**context), 400)

    # Connect to the database
    connection = Partify.model.get_db()

    # Query the database
    cur = connection.execute(
        "SELECT type "
        "FROM Products "
        "WHERE year = ? "
        "AND make = ? "
        "AND model = ?",
        (year, make, model)
    )

    temp = cur.fetchall()
    result = []

    # Convert the list of Dicts
    for t in temp:
        result.append(t['type'])

    context = {
        'products': result,
        'year': year,
        'make': make,
        'model': model
    }

    return make_response(jsonify(**context), 200)