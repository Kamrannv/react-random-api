// https://swapi.dev
export default class SwapService{
    _apiBase = `https://swapi.dev/api`
    async getResource(url){
      const res = await fetch(`${this._apiBase}${url}`);
      if(!res.ok){
        throw new Error(`couldnt fetch ${url}`)
      }
      return await res.json();
  
      }
      async getAllPeople(){
        const res = await this.getResource(`/people/`)
        return res.results
      }
      getPerson(id){
        return this.getResource(`/people/${id}/`)
      }
  
      async getAllPlanets(){
        const res = await this.getResource(`/planets/`)
        return res.results.map(this.transformPlanet);
      }
      async getPlanet(id){
        const planet = await this.getResource(`/planets/${id}/`);
        return this.transformPlanet(planet)
      }
  
  
      async getAllStarships(){
        const res = await this.getResource(`/starships/`)
        return res.results
      }
      getStarship(id){
        return this.getResource(`/starships/${id}/`)
      }
  //transformation datas
  extractId(item){
    const idRegExp=/\/([0-9]*)\/$/;
       return item.url.match(idRegExp)[1]
  }
      transformPlanet(planet){
        
        return{ 
          id:this.extractId(planet),
          name:planet.name,
          population:planet.population,
          rotationPeriod:planet.rotation_period,
          diameter:planet.diameter
      }
      }
      transformStarsip(starship){
        
        return{ 
          id:this.extractId(starship),
          name:starship.name,
          model:starship.model,
          manufacturer:starship.manufacturer,
          costInCredits:starship.costInCredits,
          length:starship.length,
          crew:starship.crew
      }
      }
      
  
    }
  
    const swapi = new SwapService();
    swapi.getAllPeople().then((people)=>{
      people.forEach((p)=>{
        console.log(p.name)
      })
    })
  