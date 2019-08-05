import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/_models/conta.class';
import { AutenticacaoService } from 'src/app/_services/autenticacao.service';
import { Papel } from 'src/app/_models/enums/tipoUsuario.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  showHeader = false;
  currentUser: Conta;


  @Output() public sidenavToggle = new EventEmitter();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private activatedRoute: ActivatedRoute,
    private autenticacaoService: AutenticacaoService) {

    if (this.autenticacaoService.currentUser !== undefined) {
      this.autenticacaoService.currentUser.subscribe(x => this.currentUser = x);
    }
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });
  }

  get isBpOuMentor() {
    return this.currentUser && (this.currentUser.papel === Papel.bp || this.currentUser.papel === Papel.metor);
  }


  get isBpOuGerente() {
    return this.currentUser && (this.currentUser.papel === Papel.bp || this.currentUser.papel === Papel.gerente);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.autenticacaoService.logout();
    this.router.navigate(['/login']);
  }

}
