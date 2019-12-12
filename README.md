# Unipäiväkirja

Tiimi: Marja, Pekka, Hanna, Santtu

## Johdanto

Projektin tarkoituksena on toteuttaa ja julkaista verkkopohjainen unipäiväkirjasovellus. Unipäiväkirjan laatimisessa sovelletaan Työterveyslaitoksen ja Käypä hoito -suosituksen mukaisia pohjia, joita lääkäri voi hyödyntää anamneesityökaluna. Käyttäjä on kuka tahansa, joka haluaa seurata ja selvittää omaa unirytmiään ja siihen vaikuttaneita ulkoisia asioita. Käyttäjä syöttää sovellukseen nukahtamis- ja heräämisajat sekä muita mahdollisia huomioita edellisestä unijaksosta. Käyttäjä saa palvelusta tiedon edellisistä uniajoistaan vertailua ja johtopäätöksiä varten. Projektin päättyessä valmiina on visuaalisesti miellyttävä ja teknisesti toimiva sovellusratkaisu.

Palvelu toteutetaan Java Spring Boot -kehystä käyttäen ja Thymeleaf template engineä hyödyntäen. Tietokantajärjestelmänä toimii PostgreSQL. Sovelluksesta tehdään responsiivinen eli se toimii luontevasti kaikilla päätelaitteilla.

## Järjestelmän määrittely

Peruskäyttäjä on henkilö, joka palveluun kirjautumalla pystyy lisäämään, muokkaamaan, tarkastelemaan ja poistamaan omia tietojaan.

Tarkastelija on henkilö, joka palveluun kirjautumalla pystyy tarkastelemaan palveluun syötettyjä tietoja haluamansa peruskäyttäjän osalta. Tarkastelija voi olla esimerkiksi lääkäri tai terapiaryhmän vetäjä.

Järjestelmän toiminnot (peruskäyttäjä)
- palveluun rekisteröityminen
- sisäänkirjautuminen
- tietojen syöttäminen: nukahtamisaika, heräämisaika, unenlaadun arviointi, uneen vaikuttaneet ulkopuoliset seikat.
- tietojen tarkastelu eri aikaväleillä
- tietojen muokaaminen
- tietojen poistaminen
- tarkasteluoikeuden myöntäminen
- uloskirjautuminen

Järjestelmän toiminnot (tarkastelija)
- palveluun rekisteröityminen
- sisäänkirjautuminen
- tarkasteluoikeuden pyytäminen
- tarkasteltavan henkilön valinta
- tietojen tarkastelu eri aikaväleillä
- uloskirjautuminen


## Käyttöliittymä

Käyttöliittymäkaavio, peruskäyttäjä
![peruskäyttäjä](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/kayttoliittymakaavio_peruskayttaja.png)

Käyttöliittymäkaavio, tarkastelija
![tarkastelija](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/kayttoliittymakaavio_tarkastelija.png)

## Tietokanta

Kaavio
![tietokantakaavio](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/DB_final.PNG)

> ### User
> _User-taulu sisältää käyttäjätilit._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> user_id | int PK | Käyttäjän id
> name | varchar(50) |  Tilin nimimerkki
> password | varchar(50) | Tilin salasana
> userLevel_id | int | Käyttäjätason id

> ### Permission
> _Permission-taulu sisältää luvat käyttäjän tietojen takasteluun. Lupa viittaa yhteen käyttäjään ja sillä on yksi tarkastelija._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> permission_id | int PK | Tilin id
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa, jolla on lupa tarkastella tietoja
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa, jonka tietoja voidaan tarkastella

> ### SleepPeriod
> _Unijaksot-taulu sisältää käyttäjien unijaksot. Unijakso liittyy aina yhteen päiväkirjamerkintään._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> user_id | int PK | Unijakson id
> startTime | DateTime | Unijakson alkuaika
> endTime | DateTime | Unijakson päättymisaika
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa

> ### Comment
> _Kommentit-taulu sisältää unijaksoon liittyvät kommentit ja laadun arvioinnin. Kommentilla on yksi kirjoittaja ja se liittyy koko vuorokauteen._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> comment_id | int PK | Kommentin id
> comment | varchar(200) | Kommentin sisältö.
> commentDate | DateTime | Kommentin päiväys.
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa
> sleepQuality | int FK | Unen laadun arviointi asteikolla.

> ### External
> _External-taulu sisältää vuorokauden unijaksoihin vaikuttaneet muut mahdolliset asiat, kuten kahvin, alkoholin tai lääkkeiden nauttimisen. Ulkoiset asiat liittyvät käyttäjään ja koko vuorokauteen._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> external_id | int PK | Ulkoisen seikan id
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa
> dateTime | DateTime | Seikan aikaleima.
> externalType | int | Seikan tyyppi.
> quantity | int | Seikan määrä, esim. alkoholiannokset.

## Tekninen kuvaus

![diagram](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/Tekninen_kuvaus.png)

Järjestelmän palvelin toteutettiin Spring Boot -frameworkilla, käyttöliittymä on React-applikaatio ja tietokantana on PostgreSQL. 


### Rajapinnan kuvaus
> Endpoint | GET | Vastaus GET | POST | Parametrit | Vastaus POST
> -------- |--- | ----------- |---- | ---------- | ------------
> /[resurssi] | Hae kaikki [resurssit]. | HTTP 200 OK ja kaikki löydetyt [resurssit] | Lisää uusi resurssi. | JSON muodossa uuden resurssin pakolliset tiedot. | 201 Created (URI Location-headerissa  ja esitys bodyssa) tai 409 Conflict
> /[resurssi]/[id] | Hae [resurssi] [id]. | löydetty [resurssi] JSON-muodossa ja 200 tai 409 Conflict
> /users/[id]/[resurssi]|Hae käyttäjän [id] kaikki [resurssit].| kaikki löydetyt [resurssit] 200 tai 409
> --------------
>  Endpoint | PUT | Parametrit | Vastaus PUT | DELETE | Vastaus DELETE
> -------- |--- | ---- | ----------- |----  | ------------
> /[resurssi]/[id] | päivitä [resurssi] [id] | JSON muodossa resurssin pakolliset tiedot. | 200 (URI Location-headerissa  ja esitys bodyssa) tai 409 Conflict | Poista [resurssi] [id] | 200 tai 409
> --------------

#### Saatavilla olevat resurssit
> Resurssin nimi |
> --------------
> sleepperiods |
> comments |
> externals |  
> users |

## Testaus

Tässä kohdin selvitetään, miten ohjelmiston oikea toiminta varmistetaan
testaamalla projektin aikana: millaisia testauksia tehdään ja missä vaiheessa.
Testauksen tarkemmat sisällöt ja testisuoritusten tulosten raportit kirjataan
erillisiin dokumentteihin.

Tänne kirjataan myös lopuksi järjestelmän tunnetut ongelmat, joita ei ole korjattu.

## Asennustiedot

### Järjestelmän kehitysympäristö: 

Lataa ja asenna [Java](https://www.oracle.com/technetwork/java/javase/downloads/index.html), 
 [Eclipse](https://www.eclipse.org/downloads/), [Node](https://nodejs.org/en/download/), [Maven](https://maven.apache.org/download.cgi), [Git](https://git-scm.com/downloads),  [Lombok](https://projectlombok.org/setup/eclipse) ja [PostgreSQL](https://www.postgresql.org/download/).

 - Kloonaa projekti: `git clone https://github.com/hannayj/sleepdiary.git`
 - Käynnistä Spring Boot -sovellus: `mvn spring-boot:run`
 - `cd frontend`
 - Asenna riippuvuudet: `npm install`
 - Käynnistä React-sovellus: `npm start`

Tietokannan määrittely:
- PostgreSQL:n [asentamisen](http://www.postgresqltutorial.com/install-postgresql/) jälkeen sovellukselle voidaan luoda käyttäjä, salasana tälle käyttäjälle, tietokanta ja antaa käyttäjälle oikeudet tietokantaan. Nämä voidaan asettaa ottamalla yhteys PostgreSQL-tietokantapalvelimelle [psql-terminaaliohjelman](http://www.postgresqltutorial.com/connect-to-postgresql-database/) avulla:

- `create user kayttaja;`
- `alter user kayttaja with encrypted password '<vahva salasana>';`
- `create database tietokannan_nimi;`
- `grant all privileges on database tietokannan_nimi to kayttaja;`

Spring Boot -sovelluksessa oleva riippuvuus pom.xml-tiedostossa:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```
src/main/resources/application.properties-tiedosto:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tietokannan_nimi
spring.datasource.username=kayttaja
spring.datasource.password=salasana
spring.jpa.show-sql=true

## Hibernaten ominaisuudet
# Tämä asetetaan, jotta Hibernate muodostaa paremmin SQL:ää valitulle tietokannalle
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect

# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = create-drop
```
Vaihtoehtoisesti voi käyttää tietokannan pääkäyttäjän tietoja (jotka määriteltiin asentaessa PostgreSQL:ää):
```properties
spring.datasource.username=postgres
spring.datasource.password=root_salasana
```
### Järjestelmän asentaminen tuotantoympäristöön:

- asenna [heroku cli](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) ja luo [heroku-tili](https://signup.heroku.com/)
- asenna heroku deploy CLI plugin: `heroku plugins:install heroku-cli-deploy`
- luo uusi sovellus Herokuun komennolla: `heroku create`
- luo JAR-tiedosto: `mvn install package`
- sovelluksen hakemistossa: `heroku deploy:jar target/sovelluksen_nimi-{ version }.jar`
- PostgreSQL-tietokannan liittäminen sovellukseen: `heroku addons:create heroku-postgresql`
- jotta saat yhteyden tietokantaan, löydät DATABASE_URL:in listaamalla konfiguraatiotiedot komennolla: `heroku config`
- pom.xml-tiedostossa tulee olla edellä mainittu postgresql-riippuvuus
- lisää mahdollisia konfiguraatiotietoja application.properties-tiedostoon:
```properties
spring.datasource.driverClassName=org.postgresql.Driver
spring.datasource.maxActive=10
spring.datasource.maxIdle=5
spring.datasource.minIdle=2
spring.datasource.initialSize=5
spring.datasource.removeAbandoned=true
```
- tietokannan url:n voi asettaa applications.yml-tiedostossa:
```properties
spring:
  datasource:
    url: ${JDBC_DATABASE_URL}
    username: ${JDBC_DATABASE_USERNAME}
    password: ${JDBC_DATABASE_PASSWORD}
```
- Procfile-tiedostossa: 
`web: java -Dspring.datasource.url=jdbc:postgresql://<tietokannan url>&sslmode=require -jar sleepdiary/target/sleepdiary-0.0.1-SNAPSHOT.jar`

Lisätietoa [tästä](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku) ja [tästä](https://devcenter.heroku.com/articles/connecting-to-relational-databases-on-heroku-with-java#using-the-jdbc_database_url) linkistä.

## Käynnistys- ja käyttöohje

Kehitysympäristössä: käynnistä sleepdiary-sovellus Eclipsessä ja React-sovellus frontend-kansiosta.
Avaa selaimessa [http://localhost:3000](http://localhost:3000).

Projekti on julkaistu Herokussa ja löytyy osoitteesta: https://sleepdiary1.herokuapp.com/

## Tietosuojailmoitus

Tämä tietosuojailmoitus koskee Sleepdiary-palvelua ja henkilötietojen käsittelyä siinä. 

### Palvelussa käsiteltävät henkilötiedot 

- yksilöintitiedot: käyttäjätunnus, etunimi, sukunimi 
- yhteystiedot: sähköpostiosoite 

### Palvelussa käsiteltävät muut tiedot 

- Palveluun syötetyt unijaksot, unen laatuun vaikuttaneet ulkopuoliset tekijät, kommentit ja vireystilan arviointi 
- Tietojen tarkastelijan yhteystiedot 

### Henkilötietojen käyttötarkoitus ja käsittelyperuste 

Käytämme henkilötietoja ainoastaan käyttäjän yksilöimiseen. Palvelun tarjoaja ei luovuta tietoja kolmansille osapuolille. Palvelussa olevat tiedot pohjautuvat täysin henkilön itse ilmoittamiin tietoihin. Henkilö voi itse päättää jakaako tietonsa ensimerkiksi hoitosuhteesta vastaavalle taholle. 

### Henkilötietojen suojaus ja säilytysaika 

Henkilötietoihin pääsy on vain niillä henkilöillä, joille se työtehtäviensä vuoksi on tarpeen. Henkilötiedot on suojattu asiattomalta pääsyltä tai käsittelemiseltä.  

Tietoja säilytetään palvelussa kuusi kuukautta viimeisen merkinnän tekemisestä tai kunnes käyttäjä itse pyytää tietojen poistamista. Tietojen poistumisesta lähetetään henkilölle muistutusviesti kuukautta ennen poistumispäivää ilmoitettuun sähköpostiosoitteeseen.  

### Rekisteröidyn oikeudet 

Pyytää rekisterinpitäjältä pääsy häntä itseään koskeviin henkilötietoihin sekä oikeus pyytää kyseisten tietojen oikaisemista tai poistamista. 

Pyytää rekisterinpitäjältä häntä itseään koskevien henkilötietojen käsittelyn rajoittamista tai vastustaa käsittelyä sekä oikeutta siirtää tiedot järjestelmästä toiseen. 

Niiltä osin kuin henkilötietojen käsittely perustuu rekisteröidyn suostumukseen, oikeus peruuttaa suostumus milloin tahansa, tämän vaikuttamatta suostumuksen perusteella ennen sen peruuttamista suoritetun käsittelyn lainmukaisuuteen. 

Tehdä valitus henkilötiedon käsittelystä kansalliselle valvontaviranomaiselle, jos rekisteröity katsoo, että häntä koskevien henkilötietojen käsittelyssä rikotaan EU:n yleistä tietosuoja-asetusta. 

Oikeuksien käyttämistä koskevan pyynnön voi jatkossa tehdä palvelussa.

![logo](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/logo_dark.png)
