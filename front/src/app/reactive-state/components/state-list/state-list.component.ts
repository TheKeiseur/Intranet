import { Component, OnInit } from '@angular/core';
import {combineLatest, map, Observable, startWith} from "rxjs";
import {User} from "../../../services/User";
import {FormBuilder, FormControl} from "@angular/forms";
import {UserSearchType} from "../../enums/user-search-type.enum";
import {StateService} from "../../services/state.service";
import {UserService} from "../../../services/user.service";
import {UserCategoryType} from "../../enums/user-category-type.enum";



@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {

// @Input() obj!: {titre: string,cat: string};
  loading$ !: Observable<boolean>;
  users$!: Observable<User[]>;

  // display list
  display!: boolean;

  // recherche

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  //
  categoryCtrl!: FormControl;
  categoryTypeCtrl!: FormControl;

  //nb post
  nombrePost$!: Observable<number>; //@todo not necessary for this component but will be used for other features


  searchTypeOptions!: {
    value: UserSearchType,
    label: string
  }[];

  categoryTypeOptions!: {
    value: UserCategoryType,
    label: string
  }[];
  constructor(public  stateService: StateService ,
              private formBuilder: FormBuilder,
              public userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservable();
    this.stateService.getUsersFromServe();
  }
  //
  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(UserSearchType.EMAIL);
    this.categoryTypeCtrl = this.formBuilder.control(UserCategoryType.AUCUN);//@TODO refactor and merge once
    this.searchTypeOptions = [
      { value: UserSearchType.EMAIL, label: 'Email'},
      { value: UserSearchType.FIRSTNAME, label: 'firstName'},
      { value: UserSearchType.CITY, label: 'City'}
    ]
    this.categoryTypeOptions = [
      { value: UserCategoryType.AUCUN,label:'aucun'},
      { value: UserCategoryType.CLIENT,label:'client'},
      { value: UserCategoryType.MARKETING,label:'marketing'},
      { value: UserCategoryType.TECHNIQUE,label:'technique'}
    ]
    this.nombrePost$ = this.userService.getNbUser();
  }
  private  initObservable() {
    // this.display =  false;
    this.loading$ = this.stateService.loading$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      // map(value => value.toLowerCase()) //@todo use this when fild  firstName is renamed  to firstname
      map(value => value)
    );



    const searchType$: Observable<UserSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );

    this.users$ = this.stateService.users$;
    // Emmet a chaque fois qu'un seul emmet
    this.users$ = combineLatest([
      search$,
      searchType$,
      this.stateService.users$
    ]).pipe(
      map(([search,searchType,users]) => users.filter(users =>
        users[searchType]?.toLowerCase().includes(search as string)

      ))
    );
  }

  onPress(){
    // this.display = !this.display;
    // this.stateService.searchEstCliquer = true;
    this.stateService.searchEstCliquer = !this.stateService.searchEstCliquer;
    this.stateService.searchEstCliquer = true;

  }


}
