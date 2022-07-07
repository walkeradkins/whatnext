from codecs import backslashreplace_errors
from .db import db


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(2000), nullable=True)
    due_date = db.Column(db.DateTime(timezone=False), nullable=True)
    created_at = db.Column(db.DateTime(timezone=False), nullable=False)

    list = db.relationship('List', back_populates='cards')

    def to_dict(self):
        return {
            'id': self.id,
            'listId': self.list_id,
            'description': self.description,
            'due_date': self.due_date,
            'created_at': self.created_at,
        }