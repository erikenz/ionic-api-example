import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
	Pokemon,
	PokemonApiResult,
	PokemonApiResults,
	PokemonService,
	Pokemons,
} from "src/app/services/pokemons.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-pokemon",
	templateUrl: "./pokemon.page.html",
	styleUrls: ["./pokemon.page.scss"],
})
export class PokemonPage implements OnInit {
	pokemon: PokemonApiResult | null = null;

	constructor(
		private route: ActivatedRoute,
		private pokemonService: PokemonService,
	) {}

	ngOnInit() {
		const name = this.route.snapshot.paramMap.get("name") as string;
		this.pokemonService.getPokemon(name).subscribe((res) => {
			this.pokemon = res;
		});
	}

	openHomepage(URL: string) {
		window.open(URL, "_blank");
	}
}
