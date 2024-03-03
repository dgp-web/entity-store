# entity-store
Dynamic actions and reducers for collection-based application states 

entity-store is a modest library for defining and transactionally manipulating application states 
that are (partly) composed of typed entity collections - with minimal effort, optimal performance, and high scaling potential.
It comes with minimal dependencies, is field-tested, and not biased towards a particular framework.  

```typescript
import { createEntityStore, EntityStateMap } from "entity-store";
/**
 * NOTE: This example uses NGRX from the Angular ecosystem but "entity-store" is not
 * biased towards a particular redux implementation.
 */
import { ActionReducerMap } from "@ngrx/store";

/**
 * 1) Define models and register them in a dedicated interface
 * such as "Entities" below
 */

export interface User {
    userId: string;
    label: string;
}

export interface Location {
    locationId: string;
    name: string;
}

export interface Entities {
    user: User;
    location: Location;
}

/**
 * 2) Create an entity store and put it in a constant
 */

export const appEntityStore = createEntityStore<Entities>({
    /**
     * An entity state is created for each entity.
     * Only keys of the provided EntityTypeMap are allowed.
     */
    entities: [
        "user",
        "location"
    ]
});

/**
 * 3) Extend your AppState definition with your entities
 */

export interface AppState extends EntityStateMap<Entities> {
    // ... other state entries
}

/**
 * 4) Register the reducers provided by the created entity store
 */

export const appReducer: ActionReducerMap<AppState> = {
    // ... other reducers
    ...appEntityStore.reducers
};

/**
 * 5) Leverage actions and selectors provided by the created entity store
 */

export const action = appEntityStore.actions.composeEntityAction({
    add: {
        user:  {
            "user01Id":  {
                userId: "user01Id",
                label: "Jason"
             }
        }
    },
    update: {
        location: {
            "location01Id": {
                name: "Home"
            }
        }
    }
});

export const selector = appEntityStore.selectors.user.getAll;
```

## Getting started
Install the package via npm
```
npm install --save entity-store
```

Store some entities! The introductory example, the following _Quick reference_ and the included TypeScript definitions show you how.

## Quick reference

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

The example at the beginning shows how to construct such an action. 
It is an instruction to add an entity of type "User" with the label "Jason" 
and id "user01Id" to our state and to update the population of the "Location" with id "location01Id" 
with the name "Home".

```typescript
import { appEntityStore } from "./app-entity-store.ts";

export const action = appEntityStore.actions.composeEntityAction({
    add: {
        user:  {
            "user01Id":  {
                userId: "user01Id",
                label: "Jason"
             }
        }
    },
    update: {
        location: {
            "location01Id": {
                name: "Home"
            }
        }
    }
});

```

Types for those actions are created dynamically for each combination of operation,
entity, and (optional) store feature. For the above action the result would be
_\[Composite] \[User] Add \[Location] Update'_. 

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

```typescript
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

## Best practices ##

TBD
- use entity store for manageing your cache, don't write reducers for CRUD logic
- don't use the actions for triggering effects
- alias actions and selectors
- keep most of your entities in a central global application state

## Advanced features ##

### Manageing selections ###

TBD

### Working with store features ###
It can be convenient to isolate regions in your store that are independent
from your main state. Those special store *features* can be used by setting the storeFeature 
option when using ```createEntityStore```.

TBD

### Configuring action-type composition ###
If you are not happy with how the dynamic action types are created, you can create your own
```CompositeEntityActionConfig``` and pass it to ```createEntityStore```.

TODO: Adjust to createEntityStore syntax

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
