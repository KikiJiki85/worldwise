import { CityType } from '../../App';
import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import styles from './CountriesList.module.css';

interface CountriesListProps {
  cities: CityType[];
  isLoading: boolean;
}

interface CountryType {
  country: string;
  emoji: string;
}

function CountriesList({ cities, isLoading }: CountriesListProps) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries: CountryType[] = cities.reduce((acc: CountryType[], city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountriesList;
