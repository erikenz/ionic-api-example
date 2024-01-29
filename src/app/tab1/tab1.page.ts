import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InfiniteScrollCustomEvent, LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import {
	PokemonApiResults,
	PokemonService,
	Pokemons,
} from "../services/pokemons.service";

@Component({
	selector: "app-tab1",
	templateUrl: "tab1.page.html",
	styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
	pokemons: Pokemons[] = [];
	currentPage = 1;

	constructor(
		private pokemonService: PokemonService,
		private loadingCtrl: LoadingController,
	) {}

	ngOnInit() {
		this.loadPokemons();
	}

	async loadPokemons(event?: InfiniteScrollCustomEvent) {
		const loading = await this.loadingCtrl.create({
			message: "Loading..",
			spinner: "bubbles",
		});
		await loading.present();

		this.pokemonService.getPokemons(this.currentPage).subscribe(
			(res) => {
				loading.dismiss();
				this.pokemons.push(...res.results);

				event?.target.complete();
				if (event) {
					event.target.disabled = res.next === null;
					// event.target.disabled = res.total_pages === this.currentPage;
				}
			},
			(err) => {
				console.log(err);
				loading.dismiss();
			},
		);
	}

	loadMore(event: InfiniteScrollCustomEvent) {
		this.currentPage++;
		this.loadPokemons(event);
	}
}
