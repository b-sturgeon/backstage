/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { JsonValue } from '@backstage/config';
import { JSONSchema7 } from 'json-schema';
import type { Entity } from './entity/Entity';

/**
 * A policy for validation or mutation to be applied to entities as they are
 * entering the system.
 */
export type EntityPolicy = {
  /**
   * Applies validation or mutation on an entity.
   *
   * @param entity The entity, as validated/mutated so far in the policy tree
   * @returns The incoming entity, or a mutated version of the same
   * @throws An error if the entity should be rejected
   */
  enforce(entity: Entity): Promise<Entity>;
};

export type JSONSchema = JSONSchema7 & { [key in string]?: JsonValue };

/**
 * A complete entity name, with the full kind-namespace-name triplet.
 */
export type EntityName = {
  kind: string;
  namespace: string;
  name: string;
};

/**
 * A reference by name to an entity, where the kind and/or the namespace can be
 * left out.
 *
 * Left-out parts of the reference need to be handled by the application,
 * either by rejecting the reference or by falling back to default values.
 */
export type CompoundEntityRef = {
  kind?: string;
  namespace?: string;
  name: string;
};

/**
 * A reference by name to an entity, either as a compact string representation,
 * or as a compound reference structure.
 */
export type EntityRef = string | CompoundEntityRef;
