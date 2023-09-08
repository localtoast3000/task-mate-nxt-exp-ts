import {
  Router as ExpressRouter,
  RequestHandler as ExpressRequestHandler,
} from 'express';
import { PrismaClient } from '@prisma/client';

export type RouterInstance = ExpressRouter;

export type DatabaseMapper = PrismaClient;

export type RequestHandler = ExpressRequestHandler;

export type MiddlewareCollection<Handlers> = (db?: DatabaseMapper) => Handlers;

export type Router = (
  router: RouterInstance,
  db?: DatabaseMapper
) => { base: string; routers: () => void };

export type ControllerCollection = (db?: DatabaseMapper) => {
  [key: string]: RequestHandler;
};
