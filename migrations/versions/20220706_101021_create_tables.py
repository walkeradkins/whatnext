"""create tables

Revision ID: 8d0b3efe3f27
Revises: 0821e7554ede
Create Date: 2022-07-06 10:10:21.494265

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d0b3efe3f27'
down_revision = '0821e7554ede'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'workspaces', 'users', ['owner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'workspaces', type_='foreignkey')
    # ### end Alembic commands ###
