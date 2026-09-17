import sqlite3


def create_connection():
    connection = sqlite3.connect("titanic.db")
    return connection


def store_data(df, connection):
    df.to_sql(
        "titanic_cleaned",
        connection,
        if_exists="replace",
        index=False
    )