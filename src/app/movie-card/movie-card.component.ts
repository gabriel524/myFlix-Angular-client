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
  favoriteMovies: any[] = [];

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
      this.favoriteMovies=res.FavoriteMovies;
      //console.log('getFavMovies():', res.FavoriteMovies);
      return this.favoriteMovies;
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
  onToggleFavMovie(id: string): void {
    //console.log(this.favoriteMovies);
    if(!this.favoriteMovies.includes(id)) {
      this.fetchApiDataService.addFavoriteMovie(id).subscribe((res)=>{
        this.favoriteMovies=res.FavoriteMovies;
        this.snackBar.open('Movie added to favourites.', 'OK', {
          duration: 3000
       })
      }, (res) => {
        //Error response
        //console.log('loginUser() response2:', res);
        this.snackBar.open(res.message, 'Something not right!', {
          duration: 4000
        });
      })
    } else {
      this.fetchApiDataService.deleteFavoriteMovie(id).subscribe((res)=>{
        this.favoriteMovies=res.FavoriteMovies;
        this.snackBar.open('Movie removed from favourites.', 'OK', {
          duration: 3000
       })
      }, (res) => {
        //Error response
        //console.log('loginUser() response2:', res);
        this.snackBar.open(res.message, 'Something not right!', {
          duration: 4000
        });
      })
    }
  }
}


