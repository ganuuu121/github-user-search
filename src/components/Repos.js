import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos}=React.useContext(GithubContext);
  console.log(repos);

  let language = repos.reduce((total , item)=>{
    const{language , stargazers_count} = item;

    if(!language) return total;
    console.log(language)

    if(!total[language]){
      total[language]={label:language, value:1 , stars:stargazers_count};
    }else{
      total[language]={
        ...total[language],
        value:total[language].value +1 ,
        stars:total[language].stars + stargazers_count
      };
    }

    return total;
  },{})
  // console.log(language);

  let mostUsed = Object.values(language).sort((a,b)=>{
    return b.value - a.value 
  }).slice(0,5);

  // mosr\t star languages

  const mostPopular = Object.values(language).sort((a,b)=>{
    return b.stars - a.stars 
  }).slice(0,5);
  // console.log(language)

  //stars  forks
  let {stars ,forks} = repos.reduce((total, item)=>{
    const{stargazers_count , name ,forks}= item;
    total.stars[stargazers_count] = {label:name,  value:stargazers_count,}
    total.forks[forks]= {label:name,  value:forks};
    return total;
  },{
    stars:{},
    forks:{}
  });

  stars = Object.values(stars).slice(-5).reverse();
  // console.log(stars)

  forks = Object.values(forks).slice(-5).reverse();
  // console.log(forks)

  console.log(repos)
  return (
    <section className='section'>
      <Wrapper>
      {/* <ExampleChart  data={chartData}/> */}
      <Pie3D  data={mostUsed}/>
      <Doughnut2D data={mostPopular} />
      <Column3D data={stars} />
      <Bar3D  data={forks}/>
      </Wrapper>
    </section>
  )
}
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
