# @dgp/entity-store
Dynamic actions and reducers for collection-based application states 

@dgp/entity-store is your go-to library for managing states composed of individual collections - 
MIT-licensed, dependency-free, field-tested, and not biased towards a particular framework.  

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

## Features
- encapsulates complex transformations in single actions
- can target entities in global and feature stores
- integrates seamlessly with other reducers
- plays together well with side-effect models
- minimizes boilerplate code for data-management tasks
- ships with TypeScript definitions

## Getting started
Install the package via npm
```
npm install --save @dgp/entity-store
```

Store some entities! The following _Quick reference_ and the annotated TypeScript definitions included
in this package show you how.

## Quick reference

### Defining entity states with interfaces

_Note: You can skip this session if you're not using TypeScript._

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

Of course you are not restricted to exclusively using entity states. They can be mixed with 
any other states or you can extend them if you like.

### Modifying state with CompositeEntityAction

Entity states can be seen as collections of objects of the same type.
Those states are modified with a defined set of actions. 

The basic operations Add, Update, 
and Remove offer  all that is needed for managing entities over their whole lifecycle.  
They are flanked by the convenience actions Clear, Set, and Select that cover reoccurring
use cases when working with entity collections.

Basic
- **Add**: Adds entities to a collection
- **Update**: Updates specified entities in a collection
- **Remove**: Removes specified entities from a collection

Convenience
- **Clear**: Removes all entities from a collection
- **Set**: Replaces all entries in an entity state with a new set
- **Select**: Mark specified entities as selected

CompositeEntityActions are composed of lists of those operations.

The action in the following example is an instruction to add a User with the label "Jason" 
and id "user01" to your store and to update the population of the Location with id "location01" 
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
entity, and and optional store feature. For the above action the result will be
_\[Composite] \[User] Add \[Location] Update'_. 

### Processing entity actions with matching reducers

Reducers created with _createEntityReducer_ can react to those actions. They are really easy to set up.
Just provide the desired identifier to the creator function.

```javascript
import { createEntityReducer, createEntityState } from "@dgp/entity-store";

const userReducer = createEntityReducer({
    entityType: "User"
});

```
