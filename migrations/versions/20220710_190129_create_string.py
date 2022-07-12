"""create string

Revision ID: 6e23ba9190a7
Revises: f9340b586b5a
Create Date: 2022-07-10 19:01:29.203763

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e23ba9190a7'
down_revision = 'f9340b586b5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('cards', 'index',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('cards', 'index',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###