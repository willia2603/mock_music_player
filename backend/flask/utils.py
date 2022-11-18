def row2dict(row):
    d = {}

    for column in row.__mapper__.column_attrs.keys():
        d[column] = getattr(row, column)
    return d
