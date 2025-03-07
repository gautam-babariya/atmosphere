import React from 'react'
import './Category.css'
import { Link } from 'react-router-dom'
import Card from '../../Subcomponents/Catcard/Catcard'

function Category() {
  return (
    <div id='category-container'>
        <div id='category-title'>Category</div>
        <div id='category-cards'>
          <Card name = {'bonsai'}/>
          <Card name = {'cactus'}/>
          <Card name = {'indor'}/>
          <Card name = {'outdor'}/>
          <Card name = {'bonsai'}/>
          <Card name = {'cactus'}/>
          <Card name = {'indor'}/>
          <Card name = {'outdor'}/>
        </div>
    </div>
  )
}

export default Category
