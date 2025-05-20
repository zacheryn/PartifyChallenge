"""REST API for collections."""
from flask import jsonify, make_response
import Partify


@Partify.app.route('/<int:year>/<make>/<model>/')
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

    results = cur.fetchall()

    context = {'results' : results}

    return make_response(jsonify(**context), 201)
