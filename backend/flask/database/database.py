from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
SQLALCHEMY_DB_URI = 'sqlite:///database/sqlite.db'

engine = create_engine(SQLALCHEMY_DB_URI)

Base = declarative_base()

