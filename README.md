# @dgp/entity-store
Dynamic actions and reducers for collection-based application states 

@dgp/entity-store is a modest library for defining and manipulating application states 
that are composed of entity collections.
It comes without dependencies, is field-tested, and not biased towards a particular framework.  

```javascript
import { CompositeEntityAction, createEntityState, createEntityReducer } from "@dgp/entity-store";

// 1) Define an entity with an initial state and a dedicated reducer
const userType = "User";      
const initialUsersState = createEntityState();  
const usersReducer = createEntityReducer({
    entityType: userType, initialUsersState
}); 

 // 2) Update the state with dynamic actions
const action = new CompositeEntityAction({                             
    set: [{
        entityType: userType,
        payload: {
            "user01": {
                label: "Jason"
            }
        }
    }]
});
const updatedState = usersReducer(initialUsersState, action);
```

## Getting started
Install the package via npm
```
npm install --save @dgp/entity-store
```

Store some entities! The following _Quick reference_ and the included TypeScript definitions show you how.

## Quick reference

### Defining entity states with interfaces

_Note: You can skip this section if you're not using TypeScript._

Use the _EntityState_ interface to declare states for each entity type you would 
like to manage in your store.

```typescript
import { EntityState } from "@dgp/entity-store";

export interface User {
    label: string;
}

export interface AppState {
    users: EntityState<User>;
}

```

### Modifying states with CompositeEntityAction

Entity states are modified with a defined set of operations. 

Basic
- **Add**: Adds entities to a collection
- **Update**: Updates specified entities in a collection
- **Remove**: Removes specified entities from a collection

Convenience
- **Clear**: Removes all entities from a collection
- **Set**: Replaces all entries in a collection with a new set
- **Select**: Mark specified entities in a collection as selected

CompositeEntityActions are composed of these operations.

The following example shows how to construct such an action. 
It is an instruction to add an entity of type "User" with the label "Jason" 
and id "user01" to our state and to update the population of the "Location" with id "location01" 
with the value 20001.

```javascript
import { CompositeEntityAction } from "@dgp/entity-store";

const action = new CompositeEntityAction({
    add: [{
        entityType: "User",
        payload: { "user01": { id: "user01", label: "Jason" } }
    }],
    update: [{
         entityType: "Location",
         payload: { "location01": { population: 20001 } }
    }]
});

```

Types for those actions are created dynamically for each combination of operation,
entity, and (optional) store feature. For the above action the result would be
_\[Composite] \[User] Add \[Location] Update'_. 

### Processing entity actions with matching reducers

Entity reducers execute the operations described by those actions. 

They are really easy to set up.
Just provide an entity type to createEntityReducer.

```javascript
import { createEntityReducer, createEntityState } from "@dgp/entity-store";

const userReducer = createEntityReducer({
    entityType: "User"
});

```
