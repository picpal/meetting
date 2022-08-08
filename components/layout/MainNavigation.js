import Link from 'next/link'
import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>만나요</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>전체장소</Link>
          </li>
          <li>
            <Link href='/new-meetup'>장소추가</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
