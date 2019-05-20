cd bikeshop_project
yarn install
yarn build:production
python manage.py migrate
python manage.py collectstatic --noinput