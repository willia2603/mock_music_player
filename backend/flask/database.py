from sqlalchemy.ext.declarative import declarative_base

# BASE: defines structure of db -> allows to extend (add) classes
Base = declarative_base()


# class defined nronalmente. instantiate tabelle con alembic -> allows for db mirgation i.e cosi che se cambio la struttura del db, mi converte gia lui i dati e posso fare le query normalmente (usa base e crea la migration in base al BAse)
