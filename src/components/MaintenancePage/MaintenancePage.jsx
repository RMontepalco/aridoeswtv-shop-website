import './MaintenancePage.css'

import maintenance from '/gifs/maintenance.gif'

export default function MaintenancePage() {

  return (
    <div className="maintenance">
      <h1>welcome to aridoeswtv's shop</h1>
      <img src={maintenance} alt="Maintenance"/>
      <h2>hello!</h2>
      <p>my shop is currently closed for maintenance :(</p>
      <p>follow me on instagram @aridoeswtv for future shop updates!</p>
    </div>
  )
}
