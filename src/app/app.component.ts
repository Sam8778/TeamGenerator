import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams:number | '' = '';
  teams: string[][] = [];

  onInput(member:string) {
    this.newMemberName = member;
  }

  onNumberOfTeams(value: string) {
    this.numberOfTeams = Number(value);
    
  }

  addMember() {
    if(!this.newMemberName) {
      this.errorMessage = 'Name cant be empty';
      return;
    }
    else {
      this.errorMessage = '';
    }
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  generateTeams() {
    if(!this.numberOfTeams || this.numberOfTeams <= 0) { // Number of teams is 0 or negative return error
      this.errorMessage = 'Invalid Number of Teams'
      return;
    }

    if(this.members.length < this.numberOfTeams) {
      this.errorMessage = 'Not enough members';
      return;
    }
    this.errorMessage = '';
    const allMembers = [...this.members];// Creating a mutated copy of the members array to not mess with the original array

    while(allMembers.length) { // while there is people still in the array keep executing
        for(let i = 0; i < this.numberOfTeams; i++) { // Iterating through the array as long as its less than the num of teams
        const randomIndex = Math.floor(Math.random() * allMembers.length);// getting a random index from the array
        const member = allMembers.splice(randomIndex, 1)[0];// Removing the index from the array 
        
        if(!member) break;

        if(this.teams[i]) { // If we have a array in the teams
          this.teams[i].push(member);// pushing the member to teams array if a array exist
        }
        else {// else let the member be the first element in the array
          this.teams[i] = [member];
        }
      }
    }
    this.members = [];
    this.numberOfTeams = '';
    
  }

}
