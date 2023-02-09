## Schemas

Schemas are used since response object received from **SQL Alchemy database** cannot be accessed outside the session. Thus, the received object is transformed into a schema object using **Pydantic**