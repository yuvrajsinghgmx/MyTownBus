# Generated by Django 5.1.3 on 2024-12-10 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busmodel', '0005_remove_booking_seats_booking_seat_numbers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='seat_numbers',
        ),
        migrations.AddField(
            model_name='booking',
            name='seats',
            field=models.ManyToManyField(to='busmodel.seat'),
        ),
    ]
