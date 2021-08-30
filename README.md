## fsapi-Remek
# Utazz Velünk - utazási iroda oldala

A webes aplikáció egy egyszerű, belföldi (azon belül is Csongrád-Csanád-megyei) utazásokat szervező iroda oldala, ahol különböző fajta utakra lehet jelentkezni (városnéző séta, gasztrotúra, evezős túra stb).

# Az alkalmazás elindítása:
## Locális alkalmazásként:
Töltsd le a az állományokat a GitHub-ról egy általad meghatározott könyvtárba. Ehhez felhasználhatod a 
```
git clone https://github.com/PROGmasters-Ujratervezes/fsapi-remek-exercise-NalhiZsolt.git 
```
parancsot.

Miután letöltődtek az állományok, nyiss egy terminált és lépj be a `fsapi-remek-exercise-NalhiZsolt\server` könyvtárba és itt futtasd a `npm run start` parancsot

sikeres indítás esetén a konzolon a
```
server connected to http://127.0.0.1:3000
info: mongodb connection successful
```
üzenet íródik ki.

Ezen kívül nyiss egy másik terminált amelyből `fsapi-remek-exercise-NalhiZsolt\utazasi-iroda` -ba kell belépni és ott add ki a `ng serve -o` parancsot. Az alkalmazás kis build-elés után elindul a böngésződben.

## Docker konténerben:

Töltsd le a az állományokat a GitHub-ról egy általad meghatározott könyvtárba. Ehhez felhasználhatod a 
```
git clone https://github.com/PROGmasters-Ujratervezes/fsapi-remek-exercise-NalhiZsolt.git
``` 
parancsot.

Telepítsd a [Docker](https://www.docker.com/)-t ha még nincs telepítve a gépedre.

Miután letöltődtek az állományok, nyiss egy terminált és lépj be a `fsapi-remek-exercise-NalhiZsolt\server` könyvtárba és itt futtasd a
`npm run docker:build` parancsot. Miután elkészült a képfájl, add ki a 
`npm run docker:run` parancsot
sikeres indítás esetén a konzolon a
```
server connected to http://127.0.0.1:3000
info: mongodb connection successful
```
üzenet íródik ki.

Ezen kívül nyiss egy másik terminált amelyből `fsapi-remek-exercise-NalhiZsolt\utazasi-iroda` -ba kell belépni és ott add ki a `ng serve -o` parancsot. Az alkalmazás kis build-elés után elindul a böngésződben.

## Internetről

Az alkalmazás elindításának harmadik módja, az internetre telepített verzió elindítása. A szerver rész a heroku-n található, míg az angulár egy Firebase tárhelyre lett telepítve. Link: 
https://utazasi-iroda.web.app/

# Szerver dokumentáció
A szerver részletes dokumentációja elérhető a szerver URL-jének `/api-doc` végpontján.

# Használat

Amennyiben nem regisztráltunk még, vagy ha kijelentkeztünk korábban az alkalmazásból, a program a login oldalra fog minket dobni. Itt - ha már regisztráltunk - lehetőségünk van az email címünk és jelszavunk megadásával bejelentkezni, hogy az oldal fontosabb részei elérhetőek legyenek számunkra. Amennyiben még nem regisztráltunk úgy az `ugrás a regisztrációs olalra` gomb megnyomásával tudunk regisztrálni az adataink megadásával. Sikeres regisztráció után pedig az előbb említett módon tudunk bejelentkezni.

Bejelentkezés nélkül is elérhető néhány menüpont, a Túráink, Csongrád megye, Aktuális Túráink ill a Túravezetőink.

# Menüpontok

## *Login*
Elérhető a Túráink oldalról illetve a navigációs sáv jobb oldali gombjával. A felhasználó beléphet az email cím és jelszó megadással
## *Regisztráció*
A login oldalról érhető el. A felhasználó regisztrálhat az oldalon, név, email cím, jelszó, életkor stb megadásával.
## *Túráink*
Általános tájékoztató arról, hogy milyen fajta utakat szervez az utazási iroda.
## *Csongrád megye*
Általános tájékoztató a megye régióiról, a régiók kisebb falvairól, községeiről, látnivalóiról, illetve a megye fontosabb településeiről.
## *Aktuális túráink*
A meghírdetett túrák, kirándulások, események listája amelyek az aktuális dátum szerint még nem múltak el, szűrési lehetőség kirándulás tipusra (biciklitúra, városnéző túra stb). Részletes leírás egy modalban jelenik meg, ahol felíratkozási lehetőség is van, bejelentkezett userek számára (ellenben bejelentkezés nélkül is bárki megtekintheti)
## *Túravezetőink*
Az utazási iroda megbízásából tevékenykedő túravezetőkről szerezhetünk bővebb információkat, ill. arról, hogy mely túrák tartoznak hozzájuk.
## *Túráim*
A bejelentkezett felhasználó megtekintheti azokat az utakat, melyekre jelentkezett, elolvashatja a túra részletes leírását, törölheti is a listájáról ill. megtekintheti az utastársait, akik szintén jelentkeztek az adott túrára.
## *Saját adatok*
A regisztráció során megadott adatokat tekinthetjük meg, módosíthatjuk a jelszavunk, email címünk, ill. fotónkat.

## **Az utazási iroda alkalmazottai számára:**

## *Új utazás felvétele*
Csak az iroda alkalmazottainak lehet, más számára nem elérhető. Értelem szerűen egy esemény adatainak felvételére alkalmas beviteli mezők, megfelelő validációval. 
## *Új túravezető felvétele*
Regisztrálhatunk egy új túravezetőt. ha bővül a csapat.
## *Utasaink*
A regisztrált userek profiljai tekinthetők meg (értelem szerűen csak megfelelő jogosultságú személy - bizalmas adatok), továbbá, hogy mely utas mely túra iránt érdeklődik. Törölni is lehet a felhaszmálókat, ha szükséges.

# API végpontok

- POST /login
- POST /refresh
- POST /logout

- GET /travellers
- GET /travellers/:id
- POST /travellers
- PUT /travellers/:id
- PUT /travellers/:id/passsword
- DELETE /travellers/:id

- GET /tours
- GET /tours/id
- POST /tours
- PUT /tours/id
- DELETE /tours/id

- GET /guides
- GET /guides/id
- POST /guides
- PUT /guides/id
- DELETE /guides/id

- GET descriptions





# Entitások
## - Túravezetők: 
A túravezetők azok, akik az utakat lebonyolítják, egy túravezetőhöz több út és több fajta kirándulás tipus is tartozhat.
## - Utasok
A regisztrált felhasználók feliratkozhatnak az egyes utakra, az egyes utaknál a nyilvános adataik (név, fénykép esetleg lakóváros) megjelenhetnek bárki számára. A teljes utaslistát és az összes adatot terméászetesen csak az arra jogosultak láthatják.
## - Túrák
Ezeket az eseményeket a túravezetők vagy más utazásszervezők hírdethetik meg és a regisztrált utasok iratkozhatnak fel rá. Tartalmazza az időpontot, programleírást, hány fő vehet részt, a már feliratkozottak listáját, esetleges képeket az adott helyszínről.

# Belépési adatok szerepkörökhöz:
## 3-as szint - mindenhez van joga:
admin@admin.com
admin234

## 2-es szint - admin oldalra beléphet, létrehozhat, megtekinthet, de nem törölhet
admin@admin.hu
admin012

## 1-es szint - admin oldalra nem léphet be, csak saját adatokat módosíthat, nem érzékeny adatokat tekinthet meg
user@user.com
password