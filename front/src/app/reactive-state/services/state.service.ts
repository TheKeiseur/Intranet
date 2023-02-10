import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, delay, map, Observable, tap} from "rxjs";
import {User} from "../../services/User";
import {environment} from "../../../environments/environment";

@Injectable()
export  class  StateService {
  constructor(private http: HttpClient) {

  }

  public searchEstCliquer = false;

  private  lastPostsLoad = 0;

  private  _loading$ = new BehaviorSubject<boolean>(false);

  // getLoading(): Observable<any>{
  //   return this._loading$.asObservable();
  // }
  get loading$(): Observable<boolean>{
    return this._loading$.asObservable()
  }


  private _posts$ = new BehaviorSubject<User[]>([]);

  get users$(): Observable<User[]>{
    return this._posts$.asObservable();
  }

  //
  private  setLoadingStatus(loading: boolean){
    this._loading$.next(loading); // next on behaviorSubject
  }

  //
  getUsersFromServe(){
    if(Date.now() - this.lastPostsLoad <= 300000){
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<User[]>(`${environment.baseUrl}/users`).pipe(
      delay(1000),
      tap(users => {
        this.lastPostsLoad = Date.now();
        this._posts$.next(users);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getPostById(id:number):Observable<User>{
    if(!this.lastPostsLoad){
      this.getUsersFromServe();
    }
    return this.users$.pipe(
      map(users => users.filter(user => user.id === id.toString())[0])
    );
  }
}
