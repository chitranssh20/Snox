# Generated by Django 4.2.6 on 2023-11-02 06:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0003_alter_user_options_alter_user_managers_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('transactionId', models.AutoField(primary_key=True, serialize=False)),
                ('cart', models.JSONField()),
                ('street', models.CharField(max_length=200)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='users.address')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
