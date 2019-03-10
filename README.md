# entity-store
Dynamic actions and reducers for collection-based application states 

entity-store is a modest library for defining and manipulating application states 
that are composed of entity collections.
It comes without dependencies, is field-tested, and not biased towards a particular framework.  

```javascript
import { CompositeEntityAction, createEntityState, createEntityReducer } from "entity-store";

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
npm install --save entity-store
```

Store some entities! The following _Quick reference_ and the included TypeScript definitions show you how.

## Quick reference

### Defining entity states with interfaces

_Note: You can skip this section if you're not using TypeScript._

Use the _EntityState_ interface to declare states for each entity type you would 
like to manage in your store.

```typescript
import { EntityState } from "entity-store";

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
import { CompositeEntityAction } from "entity-store";

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
import { createEntityReducer } from "entity-store";

const userReducer = createEntityReducer({
    entityType: "User"
});

```

## Utilities ##

entity-store comes with some utility function that make passing data to CompositeEntityActions and 
selecting data from state easier.

### createKVSFromArray ###
Add, Update, and Set operations in a CompositeEntityAction want a key-value store as 
payload, so it is often necessary to map data from an array into this form.
```javascript
import { createKVSFromArray } from "entity-store";

const users = [{
    id: "user01",
    label: "Jason"
}, {
    id: "user02",
    label: "Carsten"
}];

const userKVS = createKVSFromArray(users);
```

By default, ```createKVSFromArray``` assumes that the passed items have an attribute called
'id'. You can pass a different attribute name if your id is stored in a different member.

*Note: TypeScript users might want to use ```keyof``` here.*
```javascript
import { createKVSFromArray, User } from "entity-store";

const users = [{
    userId: "user01",
    label: "Jason"
}, {
    userId: "user02",
    label: "Carsten"
}];

const userKVS = createKVSFromArray(users, "userId" as keyof User);
```

If the id is not expressed in a single attribute value, you can also pass a function that receives
an item and returns a string as second argument to ```createKVSFromArray```.
```typescript
import { createKVSFromArray, User } from "entity-store";

const users = [{
    userCollectionId: "myCollection",
    userNumber: 1,
    label: "Jason"
}, {
    userCollectionId: "myCollection",
    userNumber: 2,
    label: "Carsten"
}];

const userKVS = createKVSFromArray(
    users, (x: User) => x.userCollectionId + x.userNumber
);
```

### getAll ###
Often, you want to work with your entities as arrays. When writing logic to select
items from an entity state, you can use ```getAll``` to achieve this.

```javascript
import { getAll } from "entity-store";

const userState = {
    ids: ["user01", "user02"],
    entites: {
        "user01": {
            id: "user01",
            label: "Jason"
        },
        "user02": {
            id: "user02",
            label: "Carsten"
        }
    }
};

const allUsers = getAll(userState);

```

### getFirstSelected ###
A frequent use case is to mark an entity as selected. Entity store does this by
putting its id in ```selectedIds```. ```getFirstSelected``` returns the
entity associated with the first entry in this collection and is useful for
modelling single selection.

```javascript
import { getFirstSelected } from "entity-store";

const userState = {
    ids: ["user01", "user02"],
    entites: {
        "user01": {
            id: "user01",
            label: "Jason"
        },
        "user02": {
            id: "user02",
            label: "Carsten"
        }
    },
    selectedIds: ["user01"]
};

const selectedUser = getFirstSelected(userState);

```

## Advanced features ##

### Working with store features ###
It can be convenient to isolate regions in your store that are independent
from your main state. Those special store *features* can be used by setting the storeFeature 
option when using ```createEntityReducer``` and ```CompositeEntityAction```.

```javascript
import { createEntityReducer, CompositeEntityAction } from "entity-store";

const userReducer = createEntityReducer({
    entityType: "User",
    storeFeature: "UserManagement"
});

const action = new CompositeEntityAction({
    add: [{
        entityType: "User",
        payload: { "user01": { id: "user01", label: "Jason" } },
        storeFeature: "UserManagement"
    }]
});

```

### Configuring action-type composition ###
If you are not happy with how the dynamic action types are created, you can create your own
```CompositeEntityActionConfig``` and pass it to ```createEntityReducer``` and ```CompositeEntityAction```.

```typescript
import { 
    createEntityReducer, CompositeEntityAction, CompositeEntityActionConfig 
} from "entity-store";

const customCompositeEntityActionConfig: CompositeEntityActionConfig = {
    prefixes: {
        composite: "[Composite]",

        add: "Add",
        remove: "Remove",
        select: "Select",
        update: "Update",
        set: "Set",
        clear: "Clear",
    },
    separator: " | ",
    spacer: " "
};

const userReducer = createEntityReducer({
    entityType: "User"
}, {
    compositeEntityActionConfig: customCompositeEntityActionConfig
});

const action = new CompositeEntityAction({
    add: [{
        entityType: "User",
        payload: { "user01": { id: "user01", label: "Jason" } }
    }]
}, customCompositeEntityActionConfig);

```