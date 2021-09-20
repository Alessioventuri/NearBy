import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-shop',
    loadChildren: () => import('./create-shop/create-shop.module').then( m => m.CreateShopPageModule)
  },
  {
    path: 'shops',
    loadChildren: () => import('./shops/shops.module').then( m => m.ShopsPageModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'ristoranti',
    loadChildren: () => import('./ristoranti/ristoranti.module').then( m => m.RistorantiPageModule)
  },
  {
    path: 'pizzerie',
    loadChildren: () => import('./pizzerie/pizzerie.module').then( m => m.PizzeriePageModule)
  },
  {
    path: 'bar',
    loadChildren: () => import('./bar/bar.module').then( m => m.BarPageModule)
  },
  {
    path: 'gelaterie',
    loadChildren: () => import('./gelaterie/gelaterie.module').then( m => m.GelateriePageModule)
  },
  {
    path: 'altro',
    loadChildren: () => import('./altro/altro.module').then( m => m.AltroPageModule)
  },
  {
    path: 'tabaccheria',
    loadChildren: () => import('./tabaccheria/tabaccheria.module').then( m => m.TabaccheriaPageModule)
  },
  {
    path: 'abbigliamento',
    loadChildren: () => import('./abbigliamento/abbigliamento.module').then( m => m.AbbigliamentoPageModule)
  },
  {
    path: 'vario',
    loadChildren: () => import('./vario/vario.module').then( m => m.VarioPageModule)
  },
  {
    path: 'ottica',
    loadChildren: () => import('./ottica/ottica.module').then( m => m.OtticaPageModule)
  },
  {
    path: 'parrucchiere',
    loadChildren: () => import('./parrucchiere/parrucchiere.module').then( m => m.ParrucchierePageModule)
  },
  {
    path: 'gioielleria',
    loadChildren: () => import('./gioielleria/gioielleria.module').then( m => m.GioielleriaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
