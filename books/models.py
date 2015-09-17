from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Book(models.Model):
	title = models.TextField()
	author = models.CharField(max_length=200)
	cover_img = models.CharField(max_length=500, null=True)
	release_date = models.DateTimeField(null=True)

	def __str__(self):
		return self.title

class Review(models.Model):
	created = models.DateTimeField()
	updated = models.DateTimeField(null=True)
	title = models.CharField(max_length=200)
	content = models.TextField()
	rating = models.IntegerField(default=0)
	book = models.ForeignKey(Book)
	user = models.ForeignKey(User)

	def __str__(self):
		return  'Book: ' + self.book.title + ' reviewed by ' + self.user.username 



