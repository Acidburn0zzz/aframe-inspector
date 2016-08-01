/* global Events */
import React from 'react';
import {InputWidget} from '../widgets';
import PropertyRow from './PropertyRow';
import Collapsible from '../Collapsible';
import Mixins from './Mixins';
import {updateEntity} from '../../actions/entity';

// @todo Take this out and use updateEntity?
function changeId (entity, componentName, propertyName, value) {
  if (entity.id !== value) {
    entity.id = value;
    Events.emit('entityIdChanged', entity);
  }
}

class CommonComponents extends React.Component {
  static propTypes = {
    entity: React.PropTypes.object
  };

  renderCommonAttributes () {
    const entity = this.props.entity;
    const components = entity ? entity.components : {};
    return Object.keys(components).filter(function (key) {
      return ['visible', 'position', 'scale', 'rotation'].indexOf(key) !== -1;
    }).map(componentName => {
      const componentData = components[componentName];
      const schema = AFRAME.components[componentName].schema;
      return (
        <PropertyRow onChange={updateEntity} key={componentName} name={componentName}
          showHelp={true} schema={schema} data={componentData.data}
          componentname={componentName} entity={entity}/>
      );
    });
  }

  render () {
    const entity = this.props.entity;
    if (!entity) { return <div></div>; }
    return (
      <Collapsible>
        <div className='collapsible-header'>
          <span>Common</span>
        </div>
        <div className='collapsible-content'>
          <div className='row'>
            <span className='text'>ID</span>
            <InputWidget onChange={changeId} entity={entity} name='id' value={entity.id}/>
          </div>
          {this.renderCommonAttributes()}
          <Mixins entity={entity}/>
        </div>
      </Collapsible>
    );
  }
}

export default CommonComponents;
