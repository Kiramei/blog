/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import particleNetwork from './particle-network'

class ParticleNetwork extends Component {
  componentDidMount () {
    const container = findDOMNode(this)
    const options = {
      density: 10000,
      velocity: 0.5,
      background:'#f5f5f5',
      particleColor:'#0859a0'
    }

    new particleNetwork(container, options) // eslint-disable-line
  }

  render () {
    const { classes, id } = this.props

    return (
      <div id={id} className={classes}/>
    )
  }
}

export default ParticleNetwork
