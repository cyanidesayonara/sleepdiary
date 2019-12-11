# Unipäiväkirja

Tiimi: Marja, Pekka, Hanna, Santtu

## Johdanto

Projektin tarkoituksena on toteuttaa ja julkaista verkkopohjainen unipäiväkirjasovellus. Unipäiväkirjan laatimisessa sovelletaan Työterveyslaitoksen ja Käypä hoito -suosituksen mukaisia pohjia, joita lääkäri voi hyödyntää anamneesityökaluna. Käyttäjä on kuka tahansa, joka haluaa seurata ja selvittää omaa unirytmiään ja siihen vaikuttaneita ulkoisia asioita. Käyttäjä syöttää sovellukseen nukahtamis- ja heräämisajat sekä muita mahdollisia huomioita edellisestä unijaksosta. Käyttäjä saa palvelusta tiedon edellisistä uniajoistaan vertailua ja johtopäätöksiä varten. Projektin päättyessä valmiina on visuaalisesti miellyttävä ja teknisesti toimiva sovellusratkaisu.

Palvelutoteutaan Java Springboot kehystä käyttäen ja thymeleaf template engineä hyödyntäen. Tietokantajärejstelmänä toimii MariaDB. Sovelluksesta tehdään responsiivinen eli se toimii luontevasti kaikilla päätelaitteilla.

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

## Tekninen kuvaus, jonka tietoja voidaan tarkastella

Teknisessä kuvauksessa esitetään järjestelmän toteutuksen suunnittelun tekniset
ratkaisut, esim.
-   Missä mikäkin järjestelmän komponentti ajetaan (tietokone, palvelinohjelma)
    ja komponenttien väliset yhteydet (vaikkapa tähän tyyliin:
    https://security.ufl.edu/it-workers/risk-assessment/creating-an-information-systemdata-flow-diagram/)
-   Palvelintoteutuksen yleiskuvaus
-   Keskeisten rajapintojen kuvaukset, esimerkit client-server -rajapinnan käytöstä (sekvenssikaaviot)
-   Toteutuksen yleiset periaatteet, esim. käyttäjän tunnistus, istunnonhallinta.

Tämän lisäksi

-   ohjelmakoodin tulee olla kommentoitua
-   luokkien, metodien ja muuttujien tulee olla kuvaavasti nimettyjä ja noudattaa
    johdonmukaisia nimeämiskäytäntöjä
-   ohjelmiston pitää olla organisoitu komponentteihin niin, että turhalta toistolta
    vältytään

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

Spring boot-sovelluksessa oleva riippuvuus pom.xml-tiedostossa:

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
- pom.xml-tiedostossa tulee olla edellä mainittu posgresql-riippuvuus
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
- Proctfile-tiedostossa: 
`web: java -Dspring.datasource.url=jdbc:postgresql://<tietokannan url>&sslmode=require -jar sleepdiary/target/sleepdiary-0.0.1-SNAPSHOT.jar`

Lisätietoa [tästä](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku) ja [tästä](https://devcenter.heroku.com/articles/connecting-to-relational-databases-on-heroku-with-java#using-the-jdbc_database_url) linkistä.

## Käynnistys- ja käyttöohje

Kehitysympäristössä: käynnistä sleepdiary-sovellus Eclipsessä ja React-sovellus frontend-kansiosta.
Avaa selaimessa [http://localhost:3000](http://localhost:3000).

Projekti on julkaistu Herokussa ja löytyy osoitteesta: https://sleepdiary1.herokuapp.com/

## Tietoturva

Pohdintaa tietoturvasta.

![logo](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/logo_dark.png)
