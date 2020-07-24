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
        const res = await this.getResource('/characters?page=1&pageSize=10');
        return await res.map(this._transformCharacter);
    }

    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }
    
    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }
    
    getAllHouses() {
        return this.getResource(`/houses/`);
    }
    
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    checkEmptyField(item){
        const empty = "empty :("
        if(item === ''){
            return empty;
        } else {
            return item;
        }
    }


    _transformCharacter(char){

        return {
            name: this.checkEmptyField(char.name),
            gender: this.checkEmptyField(char.gender),
            born: this.checkEmptyField(char.born),
            died: this.checkEmptyField(char.died),
            culture: this.checkEmptyField(char.culture)
        }
    }

    _transformHouse(house){
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            title: house.title,
            ancestralWeapons: house.ancestralWeapons
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
