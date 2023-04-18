import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Contacts from './pages/Clients';

import Edit from './pages/ClientDetail';
import CreateService from './pages/CreateService'
import Collaborator from './pages/Collaborators'
import CollaboratorDetails from './pages/CollaboratorDetail'
import Services from './pages/Services'
import ServicesDetails from './pages/ServiceDetails'
import ControlPanel from './pages/ControlPanel'
import FinishService  from './pages/FinishService';
import RegisterParts from './pages/RegisterParts'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ ControlPanel } />
      <Route exact path="/clients" component={ Contacts } />
      <Route exact path="/create/:id" component={ CreateService } />
      <Route exact path="/contacts/:id" component={ Edit } />
      <Route exact path="/collaborators/" component={ Collaborator } />
      <Route exact path="/collaborator/:id" component={ CollaboratorDetails } />
      <Route exact path="/services" component={ Services} />
      <Route exact path="/register-parts" component={ RegisterParts} />
      <Route exact path="/services/:id" component={ ServicesDetails} />
      <Route exact path="/finish-service/:id" component={ FinishService} />
    </Switch>

  );
}

export default App;
