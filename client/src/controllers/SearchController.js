import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";
const Entities = require("html-entities").AllHtmlEntities;

class SearchController {
	ByTitle = query =>
		new Promise(resolve => {
			let data = { query: query, amount: 21 };
			let dataBuffer = Buffer.from(JSON.stringify(data));
			networkController
				.send(dataBuffer, PacketType.GET_SEARCH_RESULT)
				.then(res => {
					const entities = new Entities();

					let data = JSON.parse(res.data.toString())
					for (let i = 0; i < data.results.length - 1; i++) {
						data.results[i].Title = entities.decode(data.results[i].Title);
					}

					resolve(data);
				});
		});
}

const searchController = new SearchController();
export default searchController;
