from django.urls import path
from . import views


urlpatterns = [
    path("movies/", views.MovieListView.as_view()),
    path("movies/search/", views.MovieSearchView.as_view()),
    path("movies/<str:movie_id>/", views.MovieDetailView.as_view()),
    path("movies/<str:movie_id>/recommendations/",views.MovieRecommendationsView.as_view()),
]