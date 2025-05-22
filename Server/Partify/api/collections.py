"""REST API for collections."""
import Partify.model
from flask import jsonify, make_response, request
import Partify


@Partify.app.route('/<int:year>/<make>/<model>/', methods=['GET'])
def get_collections(year, make, model):
    """Get the collections from the given year, make, and model."""
    connection = Partify.model.get_db()

    cur = connection.execute(
        "SELECT id, type "
        "FROM Products "
        "WHERE year = ? "
        "AND make = ? "
        "AND model = ? "
        "GROUP BY type ",
        (year, make, model)
    )

    context = {'results' : cur.fetchall()}

    return make_response(jsonify(**context), 201)


@Partify.app.route('/years/', methods=['GET'])
def get_years():
    """Return all distinct years in the database."""
    connection = Partify.model.get_db()

    cur = connection.execute(
        "SELECT DISTINCT year "
        "FROM products",
        tuple()
    )

    temp = cur.fetchall()
    result = []

    for t in temp:
        result.append(t['year'])

    context = {'years' : result}

    return make_response(jsonify(**context), 201)


@Partify.app.route('/makes/', methods=['GET'])
def get_makes():
    """Return all distinct makes based on URL parameters."""
    connection = Partify.model.get_db()

    year = request.args.get('year', type=int)

    context = {}

    if year is not None:
        cur = connection.execute(
            "SELECT DISTINCT make "
            "FROM Products "
            "WHERE year = ?",
            (year, )
        )
        context['year'] = year
    else:
        cur = connection.execute(
            "SELECT DISTINCT make "
            "FROM Products",
            tuple()
        )

    temp = cur.fetchall()
    result = []

    for t in temp:
        result.append(t['make'])

    context['makes'] = result

    return make_response(jsonify(**context), 201)


@Partify.app.route('/models/', methods=['GET'])
def get_models():
    """Return all distinct models based on URL parameters."""
    connection = Partify.model.get_db()

    year = request.args.get('year', type=int)
    make = request.args.get('make')

    context = {}

    if year is not None and make is not None:
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
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products "
            "WHERE year = ?",
            (year, )
        )
        context['year'] = year
    elif make is not None:
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products "
            "WHERE make = ?",
            (make, )
        )
        context['make'] = make
    else:
        cur = connection.execute(
            "SELECT DISTINCT model "
            "FROM Products",
            tuple()
        )

    temp = cur.fetchall()
    result = []

    for t in temp:
        result.append(t['model'])

    context['models'] = result

    return make_response(jsonify(**context), 201)
