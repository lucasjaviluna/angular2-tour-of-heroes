import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
  error: any;
  heroes: Hero[];
  title = 'Tour of Heroes';
  selectedHero: Hero;
  addingHero: boolean;

  constructor(private heroService: HeroService, private router: Router) {

  };

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getHeroes();
  };

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  };

  getHeroes() {
    this.heroService.getHeroesSlowly()
            .then(heroes => {
              this.heroes = heroes;
            });
  };

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
};
