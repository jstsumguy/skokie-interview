from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, Http404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.core.paginator import Paginator
from django.core.mail import EmailMessage
from collections import Counter
from books.models import *
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.contrib import auth
from skokie import settings
import json
from datetime import datetime

def index(request):
	logged_in = False
	if request.user.is_authenticated():
		logged_in = True
	books = [book for book in Book.objects.all()[:50]]
	return render(request, 'home.html', {'books': books, 'logged_in': logged_in})

def book(request, book_id):
	logged_in = False
	book = Book.objects.get(id=book_id)
	reviews = Review.objects.filter(book=book)
	user_id = request.user.id if request.user.is_authenticated() else None
	submitted = None
	if request.user.is_authenticated():
		logged_in = True
		user = request.user
		for review in reviews:
			if review.user == user:
				submitted = review
				break
	return render(request, 'book.html', {'book': book, 
										'reviews': reviews, 
										'logged_in': logged_in, 
										'submitted': submitted, 
										'book_id': book_id, 
										'user_id': user_id,
										'rp': '../..' })

@csrf_exempt
def edit_review(request):
	data = json.loads(request.body)
	title = data['title']
	content = data['content']
	review_id = data['review_id']
	#rating = data['rating']

	review = Review.objects.get(id=review_id)
	review.title = title
	review.content = content
	#review.rating = rating
	review.updated = datetime.now()
	try:
		review.save()
		return HttpResponse("success")
	except Exception as ex:
		print str(ex)
		return HttpResponse("fail")


@csrf_exempt
def new_review(request):
	data = json.loads(request.body)
	title = data['title']
	content = data['content']
	book_id = data['book_id']
	user_id = data['user_id']
	rating = 0

	user = User.objects.get(id=user_id)
	book = Book.objects.get(id=book_id)
	try:
		review = Review(user=user, rating=rating, book=book, title=title, content=content, created=datetime.now(), updated=datetime.now())
		review.save()
	except Exception as ex:
		print str(ex)
		return HttpResponse("fail")
	return HttpResponse("success")

@csrf_exempt
def check_login(request):
	if request.user.is_authenticated():
		print 'is logged in'
		return HttpResponse(request.user.id)
	else:
		print 'is not logged in'
		return HttpResponse("None")



@csrf_exempt
def signup(request):
	if request.method == 'POST':
		status = 'fail'
		username = request.POST.get('username', '')
		password = request.POST.get('password', '')
		email = request.POST.get('email', '')
		try:
			user = User.objects.create_user(username, email, password)
			user.save()
			status = 'success'
		except Exception as ex:
			print str(ex)
		return redirect('../accounts/login/')
	else:
		return render(request, 'signup.html')

def logout(request):
	if request.user.is_authenticated():
		auth.logout(request)
	return redirect('../accounts/login/')


