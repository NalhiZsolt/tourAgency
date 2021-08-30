import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  navigation: { label: string, href: string, role: number }[] = [
    { label: 'Túráink', href: '/welcome', role: 0 },
    { label: 'Csongrád megye', href: '/csongrad', role: 0 },
    { label: 'Aktuális túráink', href: '/actual-tours', role: 0 },
    { label: 'Túravezetőink', href: '/guides', role: 0 },
    { label: 'Túráim', href: '/my-tours', role: 1 },
    { label: 'Saját adatok', href: '/profil', role: 1 },

  ];
  adminNavigation: {label: string, href: string, role: number}[] = [
    { label: 'Új utazás felvétele', href: '/new-tour', role: 2 },
    { label: 'Új túravezető felvétele', href: '/new-guide', role: 2 },
    { label: 'Utasaink', href: '/travellers', role: 2 }
  ]

  tourType: {value: string, name: string}[] = [
    {value: 'gasztrotura', name: 'gasztrotúra'},
    {value: 'varosnezo_tura', name: 'városnéző túra'},
    {value: 'bicikli_tura', name: 'bicikli túra'},
    {value: 'lovas_tura', name: 'lovas túra'},
    {value: 'vizitura', name: 'vizitúra'},
    {value: 'okoturizmus', name: 'természetjárás/ökoturizmus'}
  ]

  location: {value: string, name: string}[] = [
    {value: 'csongradi_jaras', name:'Csongrádi járás'},
    {value: 'hodmezovasarhelyi_jaras', name:'Hódmezővásárhelyi járás'},
    {value: 'kisteleki_jaras', name:'Kisteleki járás'},
    {value: 'makoi_jaras', name:'Makói járás'},
    {value: 'morahalmi_jaras', name:'Mórahalmi járás'},
    {value: 'szegedi_jaras', name:'Szegedi járás'},
    {value: 'szentesi_jaras', name:'Szentesi járás'}
  ]

  city: {value: string, name: string}[] = [
    {value: 'csongrad', name:'Csongrád'},
    {value: 'hodmezovasarhely', name:'Hódmezővásárhely'},
    {value: 'mako', name:'Makó'},
    {value: 'morahalom', name:'Mórahalom'},
    {value: 'opusztaszer', name:'Ópusztaszer'},
    {value: 'szeged', name:'Szeged'},
    {value: 'szentes', name:'Szentes'}
  ]

  map: {value: string, name: string}[] = [
    {value: '../../assets/img/helyszin/csongrad.png', name:'Csongrád'},
    {value: '../../assets/img/helyszin/hodmezovasarhely.png', name:'Hódmezővásárhely'},
    {value: '../../assets/img/helyszin/mako.png', name:'Makó'},
    {value: '../../assets/img/helyszin/morahalom.png', name:'Mórahalom'},
    {value: '../../assets/img/helyszin/opusztaszer.png', name:'Ópusztaszer'},
    {value: '../../assets/img/helyszin/szeged.png', name:'Szeged'},
    {value: '../../assets/img/helyszin/szentes.png', name:'Szentes'},
    {value: '../../assets/img/helyszin/csongradi_jaras.png', name:'Csongrádi járás'},
    {value: '../../assets/img/helyszin/hodmezovasarhelyi_jaras.png', name:'Hódmezővásárhelyi járás'},
    {value: '../../assets/img/helyszin/kisteleki_jaras.png', name:'Kisteleki járás'},
    {value: '../../assets/img/helyszin/makoi_jaras.png', name:'Makói járás'},
    {value: '../../assets/img/helyszin/morahalmi_jaras.png', name:'Mórahalmi járás'},
    {value: '../../assets/img/helyszin/szegedi_jaras.png', name:'Szegedi járás'},
    {value: '../../assets/img/helyszin/szentesi_jaras.png', name:'Szentesi járás'}
  ]

  constructor() { }
}
