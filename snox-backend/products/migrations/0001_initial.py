# Generated by Django 4.2.6 on 2023-11-11 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('productId', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('subname', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='Media')),
                ('price', models.IntegerField()),
                ('brief', models.CharField(max_length=2000)),
                ('description', models.TextField()),
            ],
        ),
    ]
