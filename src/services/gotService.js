export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    async getAllCharacters(){
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    
    async getBook(id) {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    
    async getAllHouses() {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    async getHouse(id) {
        const house = this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isEmpty(data){
        if(data){
            return data
        } else {
            return 'no data :('
        }
    }


    _transformCharacter = (char) => {

        return {
            name: this.isEmpty(char.name),
            gender: this.isEmpty(char.gender),
            born: this.isEmpty(char.born),
            died: this.isEmpty(char.died),
            culture: this.isEmpty(char.culture)
        }
    }

    
    _transformHouse(house){
        return {
            name: this.checkEmptyField(house.name),
            region: this.checkEmptyField(house.region),
            words: this.checkEmptyField(house.words),
            title: this.checkEmptyField(house.title),
            ancestralWeapons: this.checkEmptyField(house.ancestralWeapons)
        }
    }

    _transformBook(book){
        return {
            name: book.name,
            namberOfPages: book.namberOfPages,
            publisher: book.publisher,
            releaased: book.releaased,
        }        
    }



}
