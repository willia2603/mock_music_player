from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
SQLALCHEMY_DB_URI = 'sqlite:///database/sqlite.db'

# creates db after calling connect() if db doesn't exist. echo = True for logging (goes to stdout) (add , echo=True)
engine = create_engine(SQLALCHEMY_DB_URI)

# BASE: defines structure of db -> allows to extend (add) model schemas (classes)
Base = declarative_base()

# class defined nronalmente. instantiate tabelle con alembic -> allows for db mirgation i.e cosi che se cambio la struttura del db, mi converte gia lui i dati e posso fare le query normalmente (usa base e crea la migration in base al BAse)
