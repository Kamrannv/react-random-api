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
        return res.results
      }
      getPlanet(id){
        return this.getResource(`/planets/${id}/`)
      }
  
  
      async getAllStarships(){
        const res = await this.getResource(`/starships/`)
        return res.results
      }
      getStarship(id){
        return this.getResource(`/starships/${id}/`)
      }
  
  
  
    }
  
    const swapi = new SwapService();
    swapi.getAllPeople().then((people)=>{
      people.forEach((p)=>{
        console.log(p.name)
      })
    })
  