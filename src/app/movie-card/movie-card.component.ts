 import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';//Display notification

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any[]=[];
  user: any={};
  FavoriteMovies: any[] = [];
  favorites: any[] =[];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
    
  }

    getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((res: any)=>{
      this.movies=res;
      //console.log('getMovies():', this.movies);
      return this.movies;
    })
  }

    getFavMovies(): void {
    this.fetchApiDataService.getUser().subscribe((res: any)=>{
      this.FavoriteMovies=res.FavoriteMovies;
      //console.log('getFavMovies():', res.FavoriteMovies);
      return this.FavoriteMovies;
    })
  }

  //opens genre window
openGenre(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '450px',
  });
}
//opens director window
openDirector(name: string, bio: string): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
    },
    width: '450px',
  });
}

//opens movie summary window
openDescription(title: string, description: string): void {
  this.dialog.open(DescriptionComponent, {
    data: {
      Title: title,
      Description: description,
    },
    width: '450px',
  });
}
  
  //gets favorite movies for user
getFavoritesMovies(): void {
  this.fetchApiDataService.getUser().subscribe((resp: any) => {
    this.favorites = resp.FavoriteMovies;
    console.log(this.favorites);
    return this.favorites;
  });
}

//checks if movie is in favorites
isFav(id: string): boolean {
  return this.favorites.includes(id);
}

//adds movie to favorites
addFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiDataService.addFavoriteMovies(id).subscribe((result) => {
    console.log(result);
    this.snackBar.open('Movie has been added to your favorites!', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}

deleteFavoriteMovies(id: string): void {
  console.log(id);
  this.fetchApiDataService.deleteFavoriteMovies(id).subscribe((result) => {
    console.log(result);
    this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  });
}
}


